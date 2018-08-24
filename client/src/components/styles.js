import styled from 'styled-components'

export const Flex =  styled.div`
  display: flex;
  justify-content: ${ props => props.justifyContent };
  align-items: ${ props => props.alignItems };
  height: ${ props => props.height };
`

export const FlexNum = styled.div`
  flex: ${ props => props.num };
  justify
`
