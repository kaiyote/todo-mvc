import { css } from 'emotion'

const footer = css`
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

const todoCount = css`
  float: left;
  text-align: left;

  & strong {
    font-weight: bold;
  }
`

const filters = css`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
`

const filter = css`
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

const clearButton = css`
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

const Footer = {
  view: ({ attrs: { todos } }) => {
    const count = todos.filter(x => !x.completed).length
    const completed = todos.filter(x => x.completed).length

    return count || completed
      ? m(`footer.${footer}`,
          m(`span.${todoCount}`,
            m('strong', count),
            ` ${pluralize(count, 'item')} left`
          ),
          m(`ul.${filters}`,
            m(`li.${filter}`)
          )
        )
      : null
  }
}

export default Footer
