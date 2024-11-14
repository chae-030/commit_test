import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "./commentsFetch";
import front from "../../../images/front.jpg";
import back from "../../../images/back.jpg";
import uiux from "../../../images/uiux.jpg";
import product from "../../../images/product.jpg";
import project from "../../../images/project.jpg";
import qa from "../../../images/qa.jpg";
import devops from "../../../images/devops.jpg";

export const useSections = () => {
  const [activeSection, setActiveSection] = useState(0);
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const { sectionIds } = useFetch();
  const handleSectionChange = (index: number) => {
    setActiveSection(index);
    const sectionNameMapping: { [key: string]: string } = {
      "Front-end 개발자": "frontend",
      "Back-end 개발자": "backend",
      "UI/UX 디자이너": "uiux",
      "프로덕트 매니저": "product",
      "프로젝트 매니저": "project",
      "QA 엔지니어": "qa",
      "데브옵스 엔지니어": "devops",
    };
    const newSectionId = sectionNameMapping[sectionIds[index]];
    navigate(`/comments/${newSectionId}`);
  };

  const imageName = (sectionName: string) => {
    const imageMap: { [key: string]: string } = {
      "Front-end 개발자": front,
      "Back-end 개발자": back,
      "UI/UX 디자이너": uiux,
      "프로덕트 매니저": product,
      "프로젝트 매니저": project,
      "QA 엔지니어": qa,
    };
    return imageMap[sectionName] || devops;
  };

  useEffect(() => {
    const sectionNameMapping: { [key: string]: number } = {
      frontend: 0,
      backend: 1,
      uiux: 2,
      product: 3,
      project: 4,
      qa: 5,
      devops: 6,
    };
    if (sectionId) {
      const mappedSection = sectionNameMapping[sectionId];
      mappedSection !== undefined
        ? setActiveSection(mappedSection)
        : setActiveSection(0);
    }
  }, [sectionId]);
  return {
    activeSection,
    handleSectionChange,
    imageName,
  };
};
