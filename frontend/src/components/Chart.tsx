interface ExampleProps {
  title: string;
  description?: string; // Optional prop
  onClick: () => void;
}

const Chart: React.FC<ExampleProps> = ({ title, description, onClick }) => {
  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Chart; 