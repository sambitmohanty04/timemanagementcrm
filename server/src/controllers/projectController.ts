import type { Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../models/Project";

// --------------------------------
// Helpers
// --------------------------------

// Maps a DB project to what the frontend expects: `id` instead of `_id`,
// plus computed `progress` and `trackedHours`.
const toClient = (p: Record<string, any>) => {
  const { _id, __v, ...rest } = p;
  const totalTasks = rest.totalTasks ?? 0;
  const completedTasks = rest.completedTasks ?? 0;

  return {
    ...rest,
    id: String(_id),
    progress:
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    trackedHours: Number(((rest.trackedSeconds ?? 0) / 3600).toFixed(1)),
  };
};

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Fields a client is allowed to change
const EDITABLE_FIELDS = [
  "name",
  "client",
  "description",
  "status",
  "priority",
  "startDate",
  "dueDate",
  "color",
];

// Bad input -> 400, everything else -> 500
const handleError = (
  res: Response,
  error: unknown,
  label: string,
  fallbackMessage: string
) => {
  console.log(label, error);

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ success: false, message: error.message });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ success: false, message: "Invalid id or value" });
    return;
  }

  res.status(500).json({ success: false, message: fallbackMessage });
};

// --------------------------------
// GET /projects
// --------------------------------
export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status, search } = req.query;

    const filter: Record<string, unknown> = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (search) {
      const pattern = escapeRegex(String(search));
      filter.$or = [
        { name: { $regex: pattern, $options: "i" } },
        { client: { $regex: pattern, $options: "i" } },
        { description: { $regex: pattern, $options: "i" } },
      ];
    }

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: projects.map(toClient),
    });
  } catch (error) {
    handleError(res, error, "Get Projects Error", "Failed to fetch projects");
  }
};

// --------------------------------
// GET /projects/stats
// --------------------------------
export const getProjectStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [totalProjects, activeProjects, completedProjects, trackedResult] =
      await Promise.all([
        Project.countDocuments(),
        Project.countDocuments({ status: "active" }),
        Project.countDocuments({ status: "completed" }),
        Project.aggregate([
          { $group: { _id: null, totalSeconds: { $sum: "$trackedSeconds" } } },
        ]),
      ]);

    const totalSeconds = trackedResult[0]?.totalSeconds || 0;
    const trackedHours = Number((totalSeconds / 3600).toFixed(1));

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        activeProjects,
        completedProjects,
        trackedHours, // was `totalHours`; the frontend reads `trackedHours`
      },
    });
  } catch (error) {
    handleError(
      res,
      error,
      "Get Project Stats Error",
      "Failed to fetch project stats"
    );
  }
};

// --------------------------------
// POST /projects
// --------------------------------
export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project = await Project.create({
      name: req.body.name,
      client: req.body.client,
      description: req.body.description,
      status: req.body.status || "active",
      priority: req.body.priority || "medium",
      startDate: req.body.startDate || undefined,
      dueDate: req.body.dueDate || undefined,
      color: req.body.color,
    });
    res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      data: toClient(project.toObject()),
    });
  } catch (error) {
    handleError(res, error, "Create Project Error", "Failed to create project");
  }
};

// --------------------------------
// PUT /projects/:id
// --------------------------------
export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, message: "Invalid project id" });
      return;
    }

    const updates = Object.fromEntries(
      EDITABLE_FIELDS.filter((key) => key in req.body).map((key) => [
        key,
        req.body[key],
      ])
    );

    const project = await Project.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      data: toClient(project),
    });
  } catch (error) {
    handleError(res, error, "Update Project Error", "Failed to update project");
  }
};

// --------------------------------
// DELETE /projects/:id
// --------------------------------
export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, message: "Invalid project id" });
      return;
    }

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    handleError(res, error, "Delete Project Error", "Failed to delete project");
  }
};