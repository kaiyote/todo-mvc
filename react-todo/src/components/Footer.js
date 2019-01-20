import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                0 8px 0 -3px #f6f6f6,
                0 9px 1px -3px rgba(0, 0, 0, 0.2),
                0 16px 0 -6px #f6f6f6,
                0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
`

const TodoCount = styled.span`
  float: left;
  text-align: left;

  & strong {
    font-weight: bold;
  }
`

const Filters = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
`

const Filter = styled.li`
  display: inline;

  & a,
  & span {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      border-color: rgba(175, 47, 47, 0.1);
    }
  }

  & span {
    border-color: rgba(175, 47, 47, 0.2);
  }
`

const ClearButton = styled.button`
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const pluralize = (count, word) => count === 1 ? word : word + 's'

const Footer = ({ count, completed, onClearCompleted }) =>
  count || completed
    ? <StyledFooter>
      <TodoCount><strong>{count}</strong> {pluralize(count, 'item')} left</TodoCount>
      <Filters>
        <Filter><FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink></Filter>
        <Filter><FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink></Filter>
        <Filter><FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink></Filter>
      </Filters>
      {completed === 0
        ? null
        : <ClearButton onClick={onClearCompleted}>Clear completed</ClearButton>
      }
    </StyledFooter>
    : null

export default Footer
