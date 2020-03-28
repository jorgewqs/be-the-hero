const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('Deve gerar um ID exclusivo', () =>{
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  })
});