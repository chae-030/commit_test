type ImageProps = {
  src: string;
  children?: React.ReactNode;
};

const Image = ({ src, children }: ImageProps) => {
  return (
    <div>
      <img src={src} alt="" />
      {children} {/* children을 렌더링 */}
    </div>
  );
};

export default Image;
