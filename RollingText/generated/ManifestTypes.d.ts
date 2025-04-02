/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    TextValue: ComponentFramework.PropertyTypes.StringProperty;
    FontSize: ComponentFramework.PropertyTypes.WholeNumberProperty;
    FontColor: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    TextValue?: string;
    FontSize?: number;
    FontColor?: string;
}
