exports.defineAutoTests = function () {
    describe('Plugin tests', function () {

        it("should exist", function () {
            expect(microsoft.plugin.cognitiveservices).toBeDefined();
        });
        //test startSpeaking
        it("should be a function", function () {
            expect(typeof microsoft.plugin.cognitiveservices.StartSpeaking === "function").toBe(true);
        });
        it("Argument should be of type string", function () {
            expect(function () {
                microsoft.plugin.cognitiveservices.StartSpeaking(22);
            }).toThrowError("Text must be of type string");
        });
        it("Argument should not be undefined", function () {
            expect(function () {
                microsoft.plugin.cognitiveservices.StartSpeaking();
            }).toThrowError("Text must be of type string");
        });
        //test SpeakTextAsync
        it("should exist", function () {
            expect(typeof microsoft.plugin.cognitiveservices.SpeakTextAsync === "function").toBe(true);
        });
        it("Argument should be of type string", function () {
            expect(function () {
                microsoft.plugin.cognitiveservices.SpeakTextAsync(22);
            }).toThrowError("Text must be of type string");
        });
        it("Argument should not be undefined", function () {
            expect(function () {
                microsoft.plugin.cognitiveservices.SpeakTextAsync();
            }).toThrowError("Text must be of type string");
        });
        //test SpeakSsml
        it("should exist", function () {
            expect(typeof microsoft.plugin.cognitiveservices.SpeakSsml === "function").toBe(true);
        });
        it("Argument should be of type string", function () {
            expect(function () {
                microsoft.plugin.cognitiveservices.SpeakSsml(22);
            }).toThrowError("Text must be of type string");
        });
        it("Argument should not be undefined", function () {
            expect(function () {
                microsoft.plugin.cognitiveservices.SpeakSsml();
            }).toThrowError("Text must be of type string");
        });
        //test SpeakSsmlAsync
        it("should exist", function () {
            expect(typeof microsoft.plugin.cognitiveservices.SpeakSsmlAsync === "function").toBe(true);
        });
        it("Argument should be of type string", function () {
            expect(function () {
                microsoft.plugin.cognitiveservices.SpeakSsmlAsync(22);
            }).toThrowError("Text must be of type string");
        });
        it("Argument should not be undefined", function () {
            expect(function () {
                microsoft.plugin.cognitiveservices.SpeakSsmlAsync();
            }).toThrowError("Text must be of type string");
        });


    });

}

