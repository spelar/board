import styled from "@emotion/styled";

type SkeletonBoardComponentProps = {
  skeletonLength: number;
};

function SkeletonBoardComponent({
  skeletonLength,
}: SkeletonBoardComponentProps) {
  const skeletonLines = Array.from({ length: skeletonLength }, (_, index) => (
    <SkeletonLine key={`SkeletonLine-${index}`} />
  ));

  return <SkeletonContainer>{skeletonLines}</SkeletonContainer>;
}

const SkeletonLine = styled.div`
  margin-bottom: 8px;
  height: 16px;
  width: 80%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
`;

const SkeletonContainer = styled.div`
  padding: 16px;
`;

export default SkeletonBoardComponent;
