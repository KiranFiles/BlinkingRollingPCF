import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class RollingText implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private textElement: HTMLSpanElement;
    private textValue = "Default Text";
    private intervalId: number | undefined;

    constructor() {
        //
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ) {
        this.container = container;

        // Ensure container styles are set correctly
        this.container.style.overflow = "hidden";
        this.container.style.position = "relative";
        this.container.style.width = "100%";
        this.container.style.height = "40px"; // Adjust height as needed

        // Create the text element
        this.textElement = document.createElement("span");
        this.textElement.style.position = "absolute";  // Required for animation
        this.textElement.style.whiteSpace = "nowrap"; 

        // Set initial styles from properties
        this.textElement.style.fontSize = context.parameters.FontSize.raw + "px" || "20px";
        this.textElement.style.color = context.parameters.FontColor.raw || "red";
        this.textElement.style.fontWeight = "bold";
        
        this.container.appendChild(this.textElement);

        // Initialize animation
        this.startAnimation();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.textValue = context.parameters.TextValue.raw || "No text provided";
        this.textElement.innerText = this.textValue;

        // Update styles from properties
        this.textElement.style.fontSize = context.parameters.FontSize.raw + "px" || "20px";
        this.textElement.style.color = context.parameters.FontColor.raw || "red";

        // Restart animation
        this.startAnimation();
    }

    private startAnimation() {
        if (!this.textElement) {
            console.error("Text element not found!");
            return;
        }

        let position = this.container.offsetWidth;
        let isBlinking = true;

        // Clear previous animation
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.intervalId = window.setInterval(() => {
            // Move text from right to left
            position -= 2;

            if (position < -this.textElement.offsetWidth) {
                position = this.container.offsetWidth;
            }
            this.textElement.style.left = position + "px";

            // Blink effect
            isBlinking = !isBlinking;
            this.textElement.style.visibility = isBlinking ? "visible" : "hidden";

        }, 100); // Adjust speed by changing 100ms
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}