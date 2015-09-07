class hamsterHouse {
  constructor(nameString) {
    // super(nameString);
    this.name = nameString;
    this.rooms = [];
  }
  addRoom(room) {
    this.rooms.push(room);
    return this;
  }
  area() {
    return this.rooms.reduce((acc, e) => {
      return acc + e.area();
    }, 0);
  }
}


class Room {
  constructor(options={}) {
    // super(options);
    let { width, length } = options;
    if (!width || !length) { throw new Error("Missing params"); }
    this.length = length;
    this.width = width;
  }
  area() {
    return this.length * this.width;
  }
}

import { expect } from "chai";

describe("hamsterHouse", () => {
  it("allows user to define a hamsterHouse object", () => {
    let hamsterHouse1 = new hamsterHouse;
    expect(hamsterHouse1).to.be.an('object');
  });

  it("labels every hamsterHouse object with a name", () => {
    let hamsterHouse1 = new hamsterHouse("Terra Vista");
    expect(hamsterHouse1.name).to.equal("Terra Vista");

    let hamsterHouse2 = new hamsterHouse("Windmill Dr");
    expect(hamsterHouse2.name).to.equal("Windmill Dr");
  });

  describe("Room", () => {
    it("throws an error if I try to define a room without properties", () => {
      expect( () => { new Room }).to.throw("Missing params");
    });

    it("accepts width and length arguments", () => {
      let room1 = new Room({ width: 7, length: 8 });
      let room2 = new Room({ width: 5, length: 15 });

      expect(room1.width).to.equal(7);
      expect(room1.length).to.equal(8);
      expect(room2.width).to.equal(5);
      expect(room2.length).to.equal(15);
    });
  });

  describe("Adding rooms to hamsterHouses", () => {
    let hamsterHouse1, hamsterHouse2;
    beforeEach(() => {
      hamsterHouse1 = new hamsterHouse("Red");
      hamsterHouse2 = new hamsterHouse("Yellow");

      let room1 = new Room({ width: 7, length: 8 });
      let room2 = new Room({ width: 5, length: 15 });
      let room3 = new Room({ width: 8, length: 11 });

      // associate rooms with a hamsterHouse
      hamsterHouse1.addRoom(room1).addRoom(room2);
      hamsterHouse2.addRoom(room3);
    });

    it("adds one or more rooms to any hamsterHouse", () => {
      // expect rooms of the hamsterHouse to be something
      expect(hamsterHouse1.rooms.length).to.equal(2);
      expect(hamsterHouse2.rooms.length).to.equal(1);
    });

    it("allows calculation of hamsterHouse areas", () => {
      expect(hamsterHouse1.area()).to.equal(131)
      expect(hamsterHouse2.area()).to.equal(88);
    });
  });

});
