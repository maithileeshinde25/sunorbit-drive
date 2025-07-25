function randomDelay(min = 500, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function taskA() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Task A completed");
      resolve();
    }, randomDelay());
  });
}

function taskB() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Task B completed");
      resolve();
    }, randomDelay());
  });
}

function taskC() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Task C completed");
      resolve();
    }, randomDelay());
  });
}

async function runTasks() {
  await taskA();
  await taskB();
  await taskC();
  console.log("All tasks completed");
}

runTasks();
