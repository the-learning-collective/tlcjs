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

describe('stringLength', function() {
    it ('should return the length of a string', function() {
        var s = "hello";
        stringLength(s).should.equal(5);
    });
});

describe('link', function () {
    it ('should prepend an item to a list', function() {
        link(1,[2,3]).should.eql([1,2,3]);
    })
});

describe('scale', function() {
    describe('scaling a circle', function() {
        // when a 50% scaled image is drawn, it's width
        // should be half of the original image
        it ('should change the width of an image by the specified percentage', function() {
            var orig = circle(20,"red")
            orig.width.should.equal(40);

            var scaled = scale(orig, 50);
            scaled.width.should.equal(20);
            scaled.height.should.equal(20);
        });
        it ('should be able to be called twice', function() {
            var orig = circle(20,"red")
            orig.width.should.equal(40);

            var scaled = scale(scale(orig, 50), 50);
            scaled.width.should.equal(10);
            scaled.height.should.equal(10);
        });
        it ('should change the radius', function () {
            var orig = circle(20, "red");

            var scaledCircle = scale(circle(20, "red"), 50).elements[0];

            scaledCircle.radius.should.equal(10);
        });
    });

    describe('scaling a rectangle', function () {

        it('should change the width and height', function () {

            var orig = rectangle(20, 40,"red");
            orig.elements[0].width.should.equal(20);

            var scaled = scale(orig, 50).elements[0];
            scaled.width.should.equal(10);
            scaled.height.should.equal(20);
        });
    });

    describe('scaling text', function() {

        it('should change the font size', function () {
            var orig = text("hello", 20);
            orig.width.should.equal(48);

            var scaled = scale(orig, 50).elements[0];
            scaled.fontSize.should.equal(10);
        });

        it('should change width and height', function () {
            var orig = text("hello", 20);
            orig.width.should.equal(48);

            var scaled = scale(orig, 50);
            scaled.width.should.equal(24);
            scaled.height.should.equal(10);
        });
    });

    describe('scaling overlays', function() {
        it('should change the width and height', function() {
            var orig = overlay(circle(20, "red"),
                               rectangle(40, 40, "white"));
            orig.width.should.equal(40);

            var scaled = scale(orig, 50);
            scaled.width.should.equal(20);
            scaled.height.should.equal(20);
        });

        it('should change the width and height of all elements', function() {
            var orig = overlay(circle(20, "red"),
                               rectangle(40, 40, "white"));

            var scaled = scale(orig, 50);

            var scaledRect = scaled.elements[0];
            scaledRect.tlc_dt.should.equal("rectangle");
            scaledRect.width.should.equal(20);
            scaledRect.height.should.equal(20);

            var scaledCircle = scaled.elements[1];
            scaledCircle.tlc_dt.should.equal("circle");
            scaledCircle.radius.should.equal(10);

        });

        it('should not de-center the elements', function() {
            var orig = overlay(circle(20, "red"),
                               rectangle(80, 80, "white"));

            var origCircle = orig.elements[1];
            origCircle.x.should.equal(20);

            var scaled = scale(orig, 50);

            var scaledCircle = scaled.elements[1];
            scaledCircle.x.should.equal(10);
            scaledCircle.y.should.equal(10);
        });
    });

    describe('scaling placeImage', function() {
        it('should change the width and height', function() {
            var orig = placeImage(circle(20, "red"),
                                  rectangle(40, 40, "white"),
                                  10, 10);
            orig.width.should.equal(40);

            var scaled = scale(orig, 50);
            scaled.width.should.equal(20);
            scaled.height.should.equal(20);
        });

        it('should change the width and height of all elements', function() {
            var orig = placeImage(circle(20, "red"),
                                  rectangle(40, 40, "white"),
                                  10, 10);

            var scaled = scale(orig, 50);

            var scaledRect = scaled.elements[0];
            scaledRect.tlc_dt.should.equal("rectangle");
            scaledRect.width.should.equal(20);
            scaledRect.height.should.equal(20);

            var scaledCircle = scaled.elements[1];
            scaledCircle.tlc_dt.should.equal("circle");
            scaledCircle.radius.should.equal(10);

        });

        it('should not de-center the elements', function() {
            var orig = placeImage(circle(20, "red"),
                                  rectangle(80, 80, "white"),
                                  10, 10);

            var origCircle = orig.elements[1];
            origCircle.x.should.equal(10);

            var scaled = scale(orig, 50);

            var scaledCircle = scaled.elements[1];
            scaledCircle.x.should.equal(5);
            scaledCircle.y.should.equal(5);
        });
    });
});
