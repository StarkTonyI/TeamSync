export const TruncateText = (text:string, maxLength = 17 ) => {
    const truncated = text?.length > maxLength ? text?.slice(0, maxLength) + "..." : text;
    return <span title={text}>{truncated}</span>;
  };