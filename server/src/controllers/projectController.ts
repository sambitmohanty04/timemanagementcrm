import type { Request, Response } from "express";
import Project from "../models/Project";

// getProjects API
export const getProjects = async(
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const{status, search} = req.query;

        const filter : Record<string, unknown> = {};

        if(status && status !== "all") {
            filter.status = status;
        }
        if(search) {
            filter.$or = [
                {
                    name : {
                        $regex : search,
                        $otions : 'i'
                    }
                },
                {
                    client : {
                        $regex : search,
                        $otions : 'i'
                    }
                },
            ];
        }

        const projects = await Project.find(filter)
            .sort({createdAt : -1})
            .lean()

        const formattedProjects = projects.map((project) => ({
            ...project,
            progress:
                project.totalTasks > 0
                    ? Math.round(
                        (project.completedTasks/project.totalTasks) * 100
                    ) : 0,
            trackedHours : Number(
                (project.trackedSeconds / 3600).toFixed(1)
            ) 
        }));

        res.status(200).json({
            success : true,
            data : formattedProjects
        })

    } catch (error) {
        console.log("Get Projects Error", error);

        res.status(500).json({
            success : false,
            message : "Failed to fetch projects"
        })
    }
}

