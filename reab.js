(function() {
  var reab, root;

  reab = function(scopeName, sequences) {
    return $('[rb-scope=' + scopeName + ']').each(function() {
      var $scope, ltAttr;
      scopeName = $(this).attr('rb-scope');
      $scope = $(this);
      ltAttr = function(ltAttr, handler) {
        return $scope.find('[' + ltAttr + ']').each(function() {
          var attrVal, bind;
          attrVal = $(this).attr(ltAttr);
          bind = function(seqName) {
            if (!sequences[seqName]) {
              throw new Error('no sequence named ' + seqName + ' for binding ' + ltAttr + ' in controller ' + scopeName);
            }
            return sequences[seqName].subscribe(function(value) {
              return $scope.find('[' + ltAttr + '="' + attrVal + '"]').each(_.partial(handler, value));
            });
          };
          if (_.contains(attrVal, ',')) {
            return _.forEach(attrVal.split(','), bind);
          } else {
            return bind(attrVal);
          }
        });
      };
      ltAttr('rb-text', function(value) {
        return $(this).text(value);
      });
      ltAttr('rb-show', function(value) {
        return $(this).show();
      });
      ltAttr('rb-hide', function(value) {
        return $(this).hide();
      });
      ltAttr('rb-enable', function(value) {
        return $(this).prop('disabled', false);
      });
      return ltAttr('rb-disable', function(value) {
        return $(this).prop('disabled', true);
      });
    });
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (!root.reab) {
    root.reab = reab;
  }

}).call(this);
