import Button from "../common/Button";
import Image from "../mainComponent/Image";
type CommentsTopSectionProps = {
  activeSection: number;
  sectionIds: string[];
  handleSectionChange: (index: number) => void;
  imageName: (sectionName: string) => any;
};
const CommentsTopSection = ({
  activeSection,
  handleSectionChange,
  imageName,
  sectionIds,
}: CommentsTopSectionProps) => {
  return (
    <>
      <div className="overflow-hidden overflow-x-scroll">
        <div className="flex gap-2 w-max">
          {sectionIds.map((sectionId, index) => (
            <Button
              text={sectionId}
              key={index}
              otherStyle="text-xs py-2 px-2"
              backgroundColor={
                activeSection === index ? "bg-brand" : "bg-white"
              }
              textColor={activeSection === index ? "text-white" : "bg-brand"}
              border={activeSection === index ? "none" : "border"}
              onClick={() => handleSectionChange(index)}
            />
          ))}
        </div>
      </div>
      <div className="text-center">
        <p className="mb-2">무슨 이야기를 나누고 있나요?</p>
        <h2 className="text-3xl font-bold" style={{ color: "#FFC801" }}>
          {sectionIds[activeSection]}
        </h2>
      </div>
      <div className="w-full">
        <Image src={imageName(sectionIds[activeSection])} />
      </div>
    </>
  );
};

export default CommentsTopSection;
