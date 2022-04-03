import { PropsWithChildren } from 'react'

export interface LinkProps {
  active: boolean
  onClick: () => void
}

export default function Link ({ active, onClick, children }: PropsWithChildren<LinkProps>) {
  return active
    ? <span>{children}</span>
    : <a href='_blank' onClick={e => { e.preventDefault(); onClick() }}>{children}</a>
}
