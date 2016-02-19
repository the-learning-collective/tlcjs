describe('fake tests', function(){

  it('should fail', function(){
    var s = "hello";
    s.should.equal("bye");
  });

  it('should pass', function(){
    var t = true;
    t.should.equal(true);
  });

});
