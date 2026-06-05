type ParsedStatValue = Readonly<{
  prefix: string;
  target: number;
  suffix: string;
}>;

export const parseStatValue = (display: string): ParsedStatValue => {
  const match = display.match(/^(\D*?)(\d+(?:\.\d+)?)(\D*)$/);

  if (!match?.[2]) {
    return { prefix: '', target: 0, suffix: display };
  }

  return {
    prefix: match[1] ?? '',
    target: Number(match[2]),
    suffix: match[3] ?? '',
  };
};

export const formatStatValue = (
  current: number,
  prefix: string,
  suffix: string,
): string => `${prefix}${current}${suffix}`;
