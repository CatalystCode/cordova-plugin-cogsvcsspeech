var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { IonicNativePlugin, cordova } from '@ionic-native/core';
import { Observable } from 'rxjs';
var CognitiveServices = /** @class */ (function (_super) {
    __extends(CognitiveServices, _super);
    function CognitiveServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CognitiveServices.prototype.SetSubscription = function (speechSubscriptionKey, serviceRegion) { return cordova(this, "SetSubscription", {}, arguments); };
    CognitiveServices.prototype.RecognizeFromMicrophone = function () { return cordova(this, "RecognizeFromMicrophone", { "callbackOrder": "reverse", "observable": true }, arguments); };
    CognitiveServices.prototype.SpeakSsml = function (speechText) { return cordova(this, "SpeakSsml", {}, arguments); };
    CognitiveServices.prototype.SpeakSsmlAsync = function (speechText) { return cordova(this, "SpeakSsmlAsync", {}, arguments); };
    CognitiveServices.prototype.StartSpeaking = function (speechText) { return cordova(this, "StartSpeaking", {}, arguments); };
    CognitiveServices.prototype.SpeakTextAsync = function (speechText) { return cordova(this, "SpeakTextAsync", {}, arguments); };
    CognitiveServices.prototype.StopListening = function () { return cordova(this, "StopListening", {}, arguments); };
    CognitiveServices.prototype.SpeakWithVoiceOptions = function (speechText, options) { return cordova(this, "SpeakWithVoiceOptions", {}, arguments); };
    CognitiveServices.prototype.SpeakStop = function () { return cordova(this, "SpeakStop", {}, arguments); };
    CognitiveServices.pluginName = "Cognitive Services";
    CognitiveServices.plugin = "microsoft-plugin-cognitiveservices";
    CognitiveServices.pluginRef = "microsoft.plugin.cognitiveservices";
    CognitiveServices.repo = "";
    CognitiveServices.platforms = ["iOS", "android"];
    CognitiveServices = __decorate([
        Injectable()
    ], CognitiveServices);
    return CognitiveServices;
}(IonicNativePlugin));
export { CognitiveServices };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2NvZ25pdGl2ZXNlcnZpY2VzL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLDhCQUEwRixNQUFNLG9CQUFvQixDQUFDO0FBQzVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7O0lBc0NLLHFDQUFpQjs7OztJQVN0RCwyQ0FBZSxhQUFDLHFCQUE2QixFQUFFLGFBQXFCO0lBTXBFLG1EQUF1QjtJQUd2QixxQ0FBUyxhQUFDLFVBQWtCO0lBRzVCLDBDQUFjLGFBQUMsVUFBa0I7SUFHakMscUNBQVMsYUFBQyxVQUFrQjtJQUc1QiwwQ0FBYyxhQUFDLFVBQWtCO0lBR2pDLHlDQUFhO0lBR2IsaURBQXFCLGFBQUMsVUFBa0IsRUFBRSxPQUE0Qjs7Ozs7O0lBakMzRCxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO09BQ0EsaUJBQWlCOzRCQXhDOUI7RUF3Q3VDLGlCQUFpQjtTQUEzQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQbHVnaW4sIENvcmRvdmEsIENvcmRvdmFQcm9wZXJ0eSwgQ29yZG92YUluc3RhbmNlLCBJbnN0YW5jZVByb3BlcnR5LCBJb25pY05hdGl2ZVBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQG5hbWUgY29nbml0aXZlc2VydmljZXNcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBwbHVnaW4gZG9lcyBzb21ldGhpbmdcbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IGNvZ25pdGl2ZXNlcnZpY2VzIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb2duaXRpdmVzZXJ2aWNlcyc7XG4gKlxuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgY29nbml0aXZlc2VydmljZXM6IGNvZ25pdGl2ZXNlcnZpY2VzKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogdGhpcy5jb2duaXRpdmVzZXJ2aWNlcy5mdW5jdGlvbk5hbWUoJ0hlbGxvJywgMTIzKVxuICogICAudGhlbigocmVzOiBhbnkpID0+IGNvbnNvbGUubG9nKHJlcykpXG4gKiAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICpcbiAqIGBgYFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNwZWVjaFZvaWNlT3B0aW9ucyB7XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICBwaXRjaD86IHN0cmluZztcbiAgdm9pY2U/OiBzdHJpbmc7XG59XG5AUGx1Z2luKFxuICB7XG4gICAgcGx1Z2luTmFtZTogXCJDb2duaXRpdmUgU2VydmljZXNcIixcbiAgICBwbHVnaW46IFwibWljcm9zb2Z0LXBsdWdpbi1jb2duaXRpdmVzZXJ2aWNlc1wiLFxuICAgIHBsdWdpblJlZjogXCJtaWNyb3NvZnQucGx1Z2luLmNvZ25pdGl2ZXNlcnZpY2VzXCIsXG4gICAgcmVwbzogJycsXG4gICAgcGxhdGZvcm1zOiBbJ2lPUycsICdhbmRyb2lkJ11cbiAgfVxuKSBcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2duaXRpdmVTZXJ2aWNlcyBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBkb2VzIHNvbWV0aGluZ1xuICAgKiBAcGFyYW0gYXJnMSB7c3RyaW5nfSBTb21lIHBhcmFtIHRvIGNvbmZpZ3VyZSBzb21ldGhpbmdcbiAgICogQHBhcmFtIGFyZzIge251bWJlcn0gQW5vdGhlciBwYXJhbSB0byBjb25maWd1cmUgc29tZXRoaW5nXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHNvbWV0aGluZyBoYXBwZW5zXG4gICAqL1xuICBAQ29yZG92YSgpXG4gIFNldFN1YnNjcmlwdGlvbihzcGVlY2hTdWJzY3JpcHRpb25LZXk6IHN0cmluZywgc2VydmljZVJlZ2lvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7IHJldHVybiB9XG5cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrT3JkZXI6ICdyZXZlcnNlJyxcbiAgICBvYnNlcnZhYmxlOiB0cnVlLFxuICB9KVxuICBSZWNvZ25pemVGcm9tTWljcm9waG9uZSgpOiBPYnNlcnZhYmxlPEFycmF5PE9iamVjdD4+IHsgcmV0dXJuIH1cblxuICBAQ29yZG92YSgpXG4gIFNwZWFrU3NtbChzcGVlY2hUZXh0OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4geyByZXR1cm4gfVxuXG4gIEBDb3Jkb3ZhKClcbiAgU3BlYWtTc21sQXN5bmMoc3BlZWNoVGV4dDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHsgcmV0dXJuIH1cblxuICBAQ29yZG92YSgpXG4gIFNwZWFrVGV4dChzcGVlY2hUZXh0OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4geyByZXR1cm4gfVxuXG4gIEBDb3Jkb3ZhKClcbiAgU3BlYWtUZXh0QXN5bmMoc3BlZWNoVGV4dDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHsgcmV0dXJuIH1cblxuICBAQ29yZG92YSgpXG4gIFN0b3BMaXN0ZW5pbmcoKTogUHJvbWlzZTx2b2lkPiB7IHJldHVybiB9XG5cbiAgQENvcmRvdmEoKVxuICBTcGVha1dpdGhWb2ljZU9wdGlvbnMoc3BlZWNoVGV4dDogc3RyaW5nLCBvcHRpb25zPzogU3BlZWNoVm9pY2VPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7IHJldHVybiB9XG4gICBcbn0iXX0=