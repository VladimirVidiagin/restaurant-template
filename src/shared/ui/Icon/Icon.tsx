import type { ComponentPropsWithoutRef } from 'react';

export interface IconProps extends ComponentPropsWithoutRef<'i'> {
  name: string;
  size?: number;
  color?: string;
}

function Icon({ name, size, color, className, style, ...rest }: IconProps) {
  return (
    <i
      className={['ri', `ri-${name}`, className].filter(Boolean).join(' ')}
      style={{ fontSize: size, color, ...style }}
      aria-hidden="true"
      {...rest}
    />
  );
}

export default Icon;
