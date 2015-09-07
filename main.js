class House {

  constructor(nameString) {
    // super(nameString);
    this.name = nameString;
    this.rooms = [];
  }
  addRoom(room) {
    this.rooms.push(room);
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

describe("House", () => {
  it("allows user to define a house object", () => {
    let house1 = new House;
    expect(house1).to.be.an('object');
  });

  it("labels every house object with a name", () => {
    let house1 = new House("Terra Vista");
    expect(house1.name).to.equal("Terra Vista");

    let house2 = new House("Windmill Dr");
    expect(house2.name).to.equal("Windmill Dr");
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

  describe("Adding rooms to houses", () => {
    let house1, house2;
    beforeEach(() => {
      house1 = new House("Red");
      house2 = new House("Yello");

      let room1 = new Room({ width: 7, length: 8 });
      let room2 = new Room({ width: 5, length: 15 });
      let room3 = new Room({ width: 8, length: 11 });

      // associate rooms with a house
      house1.addRoom(room1).addRoom(room2);
      house2.addRoom(room3);
    });


    it("adds one or more rooms to any house", () => {
      // expect rooms of the house to be something
      expect(house1.rooms.length).to.equal(2);
      expect(house2.rooms.length).to.equal(1);
    });

    it("allows calculation of house areas", () => {
      expect(house1.area()).to.equal(131)
      expect(house2.area()).to.equal(88);
    });
  });

});
