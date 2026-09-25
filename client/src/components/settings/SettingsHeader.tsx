interface SettingsHeaderProps {
  title: string;
  description: string;
}

const SettingsHeader = ({
  title,
  description,
}: SettingsHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        {title}
      </h1>

      <p className="mt-1 text-sm text-slate-400">
        {description}
      </p>
    </div>
  );
};

export default SettingsHeader;