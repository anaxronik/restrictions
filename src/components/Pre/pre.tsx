type Props = {
  children?: any;
};

const Pre = (props: Props) => {
  return <pre>{JSON.stringify(props.children, null, 2)}</pre>;
};

export default Pre;
