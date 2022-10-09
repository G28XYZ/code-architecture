import Auth from "./auth";
import Counter from "./counter";
import Header from "./header";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 320,
        height: 320,
      }}
    >
      <Header />
      <Auth />
      <Counter />
    </div>
  );
}

export default App;
