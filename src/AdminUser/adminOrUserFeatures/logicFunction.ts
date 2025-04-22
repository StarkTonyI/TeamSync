export const containsExactNumber = (item: string, number: number) => {
    const regex = new RegExp(`\\b${number}\\b`);
    return regex.test(item.toString());
  };
  