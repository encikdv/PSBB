import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  Divider,
} from "@nextui-org/react";
import { h1 } from "framer-motion/client";
import { useState } from "react";
function App() {
  const [familyNumber, setFamilyNumber] = useState(0);
  const [familyArray, setFamilyArray] = useState("");
  const [printFamilyArray, setPrintFamilyArray] = useState([]);
  const [invalid, setInvalid] = useState(false);
  const [minimumBus, setMinimumBus] = useState(0);

  let count = 0;
  const calculateMinimumBus = () => {
    let saveFamilyNumber = familyNumber;
    let saveFamilyArray = familyArray.split(" ").map((item) => {
      return parseInt(item, 10);
    });
    // console.log(saveFamilyNumber);
    // console.log(saveFamilyArray);
    let skip = false;
    let check = [];
    for (let i = 0; i < saveFamilyArray.length; i++) {
      // console.log(check);
      // checking index
      for (let j = 0; j < check.length; j++) {
        if (i == check[j]) {
          //  check.push()
          skip = true;
          // console.log(skip);
          break;
        }
      }

      if (skip) {
        skip = false;
        continue;
      }

      // checking 4
      if (saveFamilyArray[i] == 4) {
        // console.log("checking 4");
        check.push[i];
        count++;
        continue;
      }

      // checking 1
      for (let j = i + 1; j < saveFamilyArray.length; j++) {
        if (
          saveFamilyArray[i] == 1 &&
          (saveFamilyArray[j] == 1 ||
            saveFamilyArray[j] == 2 ||
            saveFamilyArray[j] == 3)
        ) {
          // console.log("checking 1");
          check.push(i);
          check.push(j);
          count++;
          skip = true;
          break;
        }
      }

      if (skip) {
        skip = false;
        continue;
      }
      // checking 2
      for (let j = i + 1; j < saveFamilyArray.length; j++) {
        if (
          saveFamilyArray[i] == 2 &&
          (saveFamilyArray[j] == 1 || saveFamilyArray[j] == 2)
        ) {
          // console.log("checking 2");
          check.push(i);
          check.push(j);
          count++;
          skip = true;
          break;
        }
      }

      if (skip) {
        skip = false;
        continue;
      }

      // checking 3
      for (let j = i + 1; j < saveFamilyArray.length; j++) {
        if (saveFamilyArray[i] == 3 && saveFamilyArray[j] == 1) {
          // console.log("checking 3");
          check.push(i);
          check.push(j);
          count++;
          skip = true;
          break;
        }
      }

      if (skip) {
        skip = false;
        continue;
      }

      count++;
    }
    console.log(count);
    setMinimumBus(count);
  };

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(familyArray.split(" "));
    // console.log(familyArray.split(" ").length);
    setPrintFamilyArray(familyArray.split(" "));
    // console.log(setPrintFamilyArray(familyArray.split(" ")));
    // let FamilyArrayLength = familyArray.split(" ")
    if (familyArray.split(" ").length != familyNumber) {
      setInvalid(true);
      setMinimumBus(0);
      // console.log(true);
    } else {
      setInvalid(false);
      calculateMinimumBus();
    }
  }
  return (
    <>
      <Navbar isBordered className="bg-blue-500">
        <NavbarBrand>
          <p className="font-inter font-semibold text-white">
            Encik Doneis Valsamidis
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <h1
              className="font-inter font-semibold  text-white"
              href="#"
              aria-current="page"
            >
              {"Pembatasan Sosial Berskala Besar (PSBB)"}
            </h1>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex"></NavbarItem>
          <NavbarItem></NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className=" flex flex-row flex-wrap p-10 gap-10 bg-gradient-to-b from-blue-500 to-sky-500 w-screen h-screen">
        <div className="flex flex-col p-5 border-solid border-2 gap-5 border-white justify-center items-center rounded-2xl">
          <h1 className="text-lg font-inter font-semibold text-white">
            Input :
          </h1>
          <form
            className="flex flex-col gap-2 justify-center items-center"
            onSubmit={handleSubmit}
          >
            <Input
              variant="bordered"
              color="secondary"
              type="number"
              className="w-80 text-white font-inter font-semibold"
              // placeholder="0"
              label="Input the number of families."
              value={familyNumber}
              onChange={(e) => setFamilyNumber(e.target.value)}
            />
            <Input
              variant="bordered"
              color="secondary"
              type="text"
              className="w-80 text-white font-inter font-semibold"
              placeholder="1 2 4 3 3"
              label="Input the number of member in the family."
              value={familyArray}
              onChange={(e) => setFamilyArray(e.target.value)}
            />
            <h2 className="font-inter text-small text-white">
              {"Example for 5 family (separated by a space) : 1 2 4 3 3"}
            </h2>
            <Divider className="bg-white h-0.5" />
            <h2 className="font-inter text-small text-white">{`Number of Families : ${familyNumber}`}</h2>
            <h2 className="font-inter text-small text-white">{`Family Array Submitted : ${printFamilyArray}`}</h2>

            <Button
              type="submit"
              className="bg-transparent border-solid border-2 text-white font-inter font-semibold hover:bg-white hover:text-sky-800"
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="flex flex-col p-5 border-solid border-2 gap-5 border-white justify-center items-center rounded-2xl">
          <h1 className="text-lg font-inter font-semibold text-white">
            Output :
          </h1>
          <h2 className="text-lg font-inter font-semibold text-white">
            Minimum bus required is : {minimumBus}
          </h2>
          {invalid ? (
            <h1 className="text-lg font-inter font-semibold text-white">
              Input must be equal with count of family
            </h1>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
