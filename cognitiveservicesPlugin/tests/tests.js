exports.defineAutoTests = function() {
    describe('StartListening', function() {
        it('should be a function', function() {
            //expect(1).toBe(2);
            expect(
                typeof microsoft.plugin.cognitiveservices.StartListening ===
                    'function'
            ).toBe(true);
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
