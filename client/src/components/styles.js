import styled from 'styled-components'

export const Flex =  styled.div`
  display: flex;
  justify-content: ${ props => props.justifyContent };
  align-items: ${ props => props.alignItems };
  height: ${ props => props.height };
  flex-direction: ${ props => props.direction || 'row' };
`

export const FlexNum = styled.div`
  flex: ${ props => props.num };
  justify
`
