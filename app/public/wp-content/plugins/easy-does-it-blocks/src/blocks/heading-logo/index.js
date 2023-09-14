import { registerBlockType } from "@wordpress/blocks";
import {
    useBlockProps,
    InspectorControls,
    InnerBlocks
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import icons from "../../icons.js";
import block from './block.json'
import './main.css'

registerBlockType(block.name, {
    icon: {
        src: icons.primary
    },
    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: `header-logo`,
        });

        return (
            <>
                <InspectorControls>
                </InspectorControls>
                <div {...blockProps}>
                    <h1>
                        <a href="/" className="logo">
                            <div>
                                <InnerBlocks
                                    allowedBlocks={["easy-does-it-blocks/edi-logo"]}
                                    template={[
                                        [
                                            "easy-does-it-blocks/edi-logo",
                                            {
                                                imgID: 0,
                                                ImgAlt: "Company Logo",
                                                imgURL: "https://picsum.photos/300/100"
                                            }
                                        ]
                                    ]}
                                />
                            </div>
                        </a>
                    </h1>
                </div>
            </>
        );
    },
    save() {
        return (
            <div className="header-logo">
                <h1>
                    <a href="/" className="logo">
                        <InnerBlocks.Content />
                    </a>
                </h1>            
            </div>
        );
    }
});