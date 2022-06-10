import { Wrapper } from './NavMenuStyled';
import NavList from './navList/NavList';
import Button from '../common/button/Button';
import { Link } from 'react-router-dom';
import CreateProject from '../projects/createProject/CreateProject';
import CreateSprint from '../sprints/createSprint/CreateSprint';
import { useState } from 'react';
import { IListProjectProps, IListSprintProps } from './types/types';

const NavMenu = ({ title, list, path, linkTo = '/' }: IListProjectProps | IListSprintProps) => {
  const [closeModalProject, setCloseModalProject] = useState<boolean>(false);
  const [openModalSprints, setOpenModalSprints] = useState<boolean>(false);

  return (
    <Wrapper>
      <Link className="goBack" to={{ pathname: linkTo }}>
        <div>
          <span className="material-icons-outlined arrow">arrow_right_alt</span>
        </div>
        <p className="button-title">Показати {title}</p>
      </Link>
      <NavList title={title} list={list} path={path} linkTo={linkTo} />
      <div className="button__wrapper">
        <Button
          onHandleClick={() =>
            title === 'спринти' ? setOpenModalSprints(true) : setCloseModalProject(true)
          }
        />
        <p className="text">Створити {title === 'спринти' ? 'спринт' : 'проект'}</p>
      </div>
      <CreateProject closeModal={closeModalProject} setCloseModal={setCloseModalProject} />
      <CreateSprint closeModal={openModalSprints} setCloseModal={setOpenModalSprints} />
    </Wrapper>
  );
};

export default NavMenu;
