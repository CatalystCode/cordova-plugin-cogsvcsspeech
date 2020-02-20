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

    describe('init', function() {
        it('should be a function', function() {
            expect(
                typeof microsoft.plugin.cognitiveservices.init === 'function'
            ).toBe(true);
        });

        it('should be a have parameters', function() {
            expect(() => {
                microsoft.plugin.cognitiveservices.init();
            }).toThrowError('speechKey is required');
        });

        it('should be a have speechKey', function() {
            expect(() => {
                microsoft.plugin.cognitiveservices.init(undefined, '');
            }).toThrowError('speechKey is required');
        });

        it('speechKey should be string', function() {
            expect(() => {
                microsoft.plugin.cognitiveservices.init(12, '');
            }).toThrowError('speechKey must be of type string');
        });

        it('should be a have serviceRegion', function() {
            expect(() => {
                microsoft.plugin.cognitiveservices.init('', undefined);
            }).toThrowError('serviceRegion is required');
        });

        it('serviceRegion should be string', function() {
            expect(() => {
                microsoft.plugin.cognitiveservices.init('', 23);
            }).toThrowError('serviceRegion must be of type string');
        });
    });
};

exports.defineManualTests = function(contentEl, createActionButton) {
    microsoft.plugin.cognitiveservices.init(
        '',
        ''
    );

    createActionButton('Start Listening Recognized', function() {
        microsoft.plugin.cognitiveservices.StartListening(
            function(result) {
                if (result['isFinal']!= null) {
                    if (result['isFinal'] == 'true') {
                        console.log('Start Listening Recognized>>>' + result['result']);
                    }
                } else {
                    console.log('Start Listening Recognized>>>' + result);
                }
            },
            function(err) {
                console.log('Start Listening Recognized Error>>>' + err);
            }
        );
    });

    createActionButton('Start Listening Recognizing', function() {
        microsoft.plugin.cognitiveservices.StartListening(
            function(result) {
                if (result['isFinal']!= null) {
                    if (result['isFinal'] == 'false') {
                        console.log('Start Listening Recognizing>>>' + result['result']);
                    }
                } else {
                    console.log('Start Listening Recognizing>>>' + result);
                }
            },
            function(err) {
                console.log('Start Listening Recognizing Error>>>' + err);
            }
        );
    });
};
