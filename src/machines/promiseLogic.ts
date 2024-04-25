import { createActor, fromPromise } from "xstate";

const promiseLogic = fromPromise(async () => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const dog = await response.json();
  return dog;
});

const promiseActor = createActor(promiseLogic);

promiseActor.subscribe((snapshot) => {
  console.log(snapshot);
});

promiseActor.start();