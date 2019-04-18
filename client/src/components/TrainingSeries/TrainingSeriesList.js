// main page for displaying list of all training series
import React, { Suspense } from 'react';

//Styling
import styled from 'styled-components';

//Components
// import TrainingSeries from './TrainingSeries';
const TrainingSeries = React.lazy(() => import('./TrainingSeries'));

const TrainingSeriesList = props => {
  let arr = [];
  let offset = props.offset;
  let x = offset;
  let y = offset + props.limit;
  arr = props.trainingSeries.slice(x, y);

  return (
    <ListStyles>
      {arr.map((series, index) => (
        <Suspense key={index} fallback={<span />}>
          <TrainingSeries
            trainingSeriesID={series.trainingSeriesID}
            key={index}
            deleteTrainingSeries={props.deleteTrainingSeries}
            data={series}
            match={props.match}
            userId={props.userId}
            // postCount={postCount}
          />
        </Suspense>
      ))}
    </ListStyles>
  );
};

export default TrainingSeriesList;
//Styled Components
const ListStyles = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0px;
  margin: 0px;
`;
