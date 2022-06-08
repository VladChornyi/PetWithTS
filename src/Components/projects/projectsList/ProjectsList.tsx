import { ProjectsListStyled } from './ProjectsListStyled';
import ProjectItem from '../projectItem/ProjectItem';
import { randomBackgroud } from '../../../helpers/randomBackground';
import { colors } from '../../../configs/background.json';

interface IProject {
  _id: string;
  id: string;
  title: string;
  description: string;
}

interface IProps {
  projects: IProject[];
}

const ProjectsList = ({ projects }: IProps) => {
  return (
    <ProjectsListStyled>
      {projects.map((item) => (
        <ProjectItem
          key={item._id ?? item.id}
          project={item}
          background={randomBackgroud(colors)}
        />
      ))}
    </ProjectsListStyled>
  );
};

export default ProjectsList;
