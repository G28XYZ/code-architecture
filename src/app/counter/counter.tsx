import { observer } from "mobx-react-lite";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

const Counter = observer(() => {
  const { inc, dec } = useStore().get("counter");
  const select = useSelector((state: any) => ({ value: state.counter.value }));

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <button onClick={dec}> - </button>
      <div>{select.value}</div>
      <button onClick={inc}> + </button>
    </div>
  );
});

export default Counter;
