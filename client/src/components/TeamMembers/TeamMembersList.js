// main page for displaying all team members

import React, { Suspense } from 'react';
// import TeamMember from './TeamMember';
import styled from 'styled-components';
const TeamMember = React.lazy(() => import('./TeamMember'));

const TeamMembersList = props => {
  let arr = [];
  let offset = props.offset;
  let x = offset;
  let y = offset + props.limit;
  arr = props.teamMembers.slice(x, y);

  return (
    <>
      <ListStyles>
        {arr.map(member => (
          <Suspense key={member.teamMemberID} fallback={<span />}>
            <TeamMember
              key={member.teamMemberID}
              teamMember={member}
              deleteTeamMember={props.deleteTeamMember}
              userId={props.userId}
            />
          </Suspense>
        ))}
      </ListStyles>
    </>
  );
};

export default TeamMembersList;

const ListStyles = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0px;
  margin: 0px;
`;
