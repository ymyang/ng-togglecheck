/**
 * Created by yang on 2016/3/9.
 */
angular.module('ng-togglecheck', []).service('ToggleCheck', function() {

    function ToggleCheck(items, checkeds) {
        this.init(items, checkeds);
    }

    ToggleCheck.prototype = {
        constructor: ToggleCheck,

        init: function(items, checkeds) {
            this.items = items;
            this.checkeds = checkeds;
        },

        toggleCheckAll: function() {
            var checkAll = this.hasCheckAll();
            this.items.forEach(function(item) {
                item.checked = !checkAll;
            });
            this.updateCheckeds(checkAll ? [] : this.items);
        },

        uncheckAll: function() {
            this.checkeds.splice(0, this.checkeds.length);
            this.items.forEach(function(item) {
                item.checked = false;
            });
        },

        toggleCheck: function(select) {
            select.checked = !select.checked;

            this.items.forEach(function(item) {
                if (item.checked && item != select) {
                    item.checked = false;
                }
            });
            this.updateCheckeds(select.checked ? [select] : []);
        },

        checkItem: function(select) {
            select.checked = true;

            this.items.forEach(function(item) {
                if (item.checked && item != select) {
                    item.checked = false;
                }
            });
            this.updateCheckeds(select.checked ? [select] : []);
        },

        checkItems: function(items) {
            items.forEach(function(item) {
                item.checked = true;
            });
            this.updateCheckeds(items);
        },

        multiCheck: function(select) {
            select.checked = !select.checked;
            var checkeds = this.items.filter(function(item) {
                return item.checked;
            });
            this.updateCheckeds(checkeds);
        },

        hasCheckAll: function() {
            return this.checkeds.length && this.checkeds.length === this.items.length;
        },

        updateCheckeds: function(checkeds) {
            var _args = [0, this.checkeds.length].concat(checkeds);
            Array.prototype.splice.apply(this.checkeds, _args);
        }
    };

    return ToggleCheck;

});