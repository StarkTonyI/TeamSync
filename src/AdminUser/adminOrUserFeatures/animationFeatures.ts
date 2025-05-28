export const makeDelay = (section: "header" | "messages" | "input" | "high",  reverse:boolean) => {
    const delays = {
      header: 0.8,
      high:1.4,
      messages: 2.1,
      input: 2.6
    }
    return !reverse 
    ? Object.values(delays).reverse()[Object.keys(delays).indexOf(section)] 
    
    : delays[section]
}


