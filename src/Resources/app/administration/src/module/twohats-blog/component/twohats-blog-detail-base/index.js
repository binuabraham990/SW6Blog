/*
 * @package inventory
 */

import template from './twohats-blog-detail-base.html.twig';

const {Component, Mixin} = Shopware;
const {mapPropertyErrors} = Component.getComponentHelper();

export default {
    template,

    mixins: [
        Mixin.getByName('placeholder'),
    ],

    props: {
        blog: {
            type: Object,
            required: true,
            default() {
                return {};
            },
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        allowEdit: {
            type: Boolean,
            required: false,
            default: true,
        },
    },

    data() {
        return {
        };
    },
};