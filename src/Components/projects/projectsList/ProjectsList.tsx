import { ProjectsListStyled } from './ProjectsListStyled';
import ProjectItem from '../projectItem/ProjectItem';
import { randomBackgroud } from '../../../helpers/randomBackground';
import { colors } from '../../../configs/background.json';
import { IProjectState } from '../../../redux/types/typesStore';

interface IProps {
  projects: IProjectState[];
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
