import { registerBlockType } from '@wordpress/blocks';
import {
    useBlockProps,
    InspectorControls,
    MediaPlaceholder,
    BlockControls,
    MediaReplaceFlow,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    TextareaControl,
    Spinner,
    ToolbarButton
} from "@wordpress/components";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import { useState } from "@wordpress/element";
import icons from '../../icons.js';
import './main.css';

registerBlockType('easy-does-it-blocks/edi-logo', {
    icon: {
        src: icons.primary
    },
    edit({ attributes, setAttributes }) {
        const { imgID, imgAlt, imgURL } = attributes;
        
        const [imgPreview, setImgPreview] = useState(imgURL);

        const selectImg = (img) => {
            let newImgURL = null;

            if (isBlobURL(img.url)) {
                newImgURL = img.url;
            } else {
                newImgURL = img.sizes
                ? img.sizes.thumbnail.url
                : img.media_details.sizes.thumbnail.source_url;

                setAttributes({
                    imgID: img.id,
                    imgAlt: img.alt,
                    imgURL: newImgURL
                });

                revokeBlobURL(imgPreview);
            }

            setImgPreview(newImgURL);
        };

        const selectImgURL = (url) => {
            setAttributes({
                imgID: null,
                imgAlt: null,
                imgURL: url
            });

            setImgPreview(url);
        };

        const imageClass = `wp-image-${imgID}`;

        return (
            <>
                {imgPreview && (
                    <BlockControls group="inline">
                        <MediaReplaceFlow
                            name={__("Replace Image", "easy-does-it-blocks")}
                            mediaId={imgID}
                            mediaURL={imgURL}
                            allowedTypes={["image"]}
                            accept={"image/*"}
                            onError={(error) => console.error(error)}
                            onSelect={selectImg}
                            onSelectURL={selectImgURL}
                        />
                        <ToolbarButton
                            onClick={() => {
                            setAttributes({
                                imgID: 0,
                                imgAlt: "",
                                imgURL: "",
                            });
                
                            setImgPreview("");
                            }}
                        >
                            {__("Remove Image", "easy-does-it-blocks")}
                        </ToolbarButton>
                    </BlockControls>
                )}            
                <InspectorControls>
                    <PanelBody title={__("Settings", "easy-does-it-blocks")}>
                        {imgPreview && !isBlobURL(imgPreview) && (
                            <TextareaControl
                                label={__("Alt Attribute", "easy-does-it-blocks")}
                                value={imgAlt}
                                onChange={(imgAlt) => setAttributes({ imgAlt })}
                                help={__(
                                    "Description of your image for screen readers.",
                                    "easy-does-it-blocks"
                                )}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
                {imgPreview && (
                    <img src={imgPreview} alt={imgAlt} className={imageClass} />
                )}
                {isBlobURL(imgPreview) && <Spinner />}
                <MediaPlaceholder
                    allowedTypes={["image"]}
                    accept={"image/*"}
                    icon="admin-users"
                    onSelect={selectImg}
                    onError={(error) => console.error(error)}
                    disableMediaButtons={imgPreview}
                    onSelectURL={selectImgURL}
                />
            </>
        )
    },
    save({ attributes }) {
        const { imgID, imgAlt, imgURL } = attributes;
        const imageClass = `wp-image-${imgID}`;

        return (
            <>
                {imgURL && <img src={imgURL} alt={imgAlt} className={imageClass} />}
            </>
        );
    }
});