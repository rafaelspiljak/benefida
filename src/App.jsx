import "./App.css";
import FamilyImpactSection from "./FamilyImpactSection";

function App() {
  return (
    <>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >
          <FamilyImpactSection />
        </form>
      </div>
    </>
  );
}

export default App;
