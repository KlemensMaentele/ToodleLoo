class Matrix {
  constructor(taskList = []) {
    this.taskList = taskList;
  }

  getTasksForQuadrant(quadrant) {
    return this.taskList.filter((task) => task.quadrant === quadrant);
  }

  addTask(task) {
    this.taskList.push(task);
  }
}

export default Matrix;
