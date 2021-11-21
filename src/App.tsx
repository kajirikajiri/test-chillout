import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import chillout from "chillout";
import { useState } from "react";

export default function App() {
  const array= [...Array(10000000)];
  const [numbers, setNumbers] = useState<JSX.Element[]>()

  function heavyProcess() {
    var v;
    for (var i = 0; i < 5000; i++) {
      for (var j = 0; j < 5000; j++) {
        v = i * j;
      }
    }
    return v;
  }

  const onClickDefault =() =>{
    const a: JSX.Element[]=[]
    for (let i = 0; i < array.length; i++) {
      heavyProcess()
      console.log('default')
      a.push(<Box>{i}</Box>)
    }
    setNumbers(a)
  }

  const onClickChillout = async() =>{
    const b: JSX.Element[] = [];
    await chillout.forEach(array, (_, i) => {
      heavyProcess()
      console.log('chillout')
      b.push(<Box>{i}</Box>)
    });
    setNumbers(b)
  }

  return (
    <div className="App">
      <Box>
        <Button
          onClick={onClickDefault}
        >
          start default
        </Button>
  
        <Button
          onClick={onClickChillout}
        >
          start chill out
        </Button>
  
        <Button onClick={()=>
          setNumbers(undefined)}
        >
          reset
        </Button>
      </Box>

      {numbers ?<Box>{numbers}</Box>:<CircularProgress />}
    </div>
  );
}
