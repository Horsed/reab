    reab = (scopeName, sequences) ->
        
      $('[rb-scope=' + scopeName + ']').each(->
        scopeName = $(this).attr('rb-scope')
        $scope = $(this)

        ltAttr = (ltAttr, handler) ->
          $scope.find('[' + ltAttr + ']').each(->
            attrVal = $(this).attr(ltAttr)

            bind = (seqName) ->
              if not sequences[seqName] then throw new Error('no sequence named ' + seqName + ' for binding ' + ltAttr + ' in controller ' + scopeName)
              
              sequences[seqName].subscribe((value) ->
                $scope.find('[' + ltAttr + '="' + attrVal + '"]').each(_.partial(handler, value)))
            
            if _.contains(attrVal, ',')
              _.forEach(attrVal.split(','), bind)
            else
              bind(attrVal)
          )

        ltAttr('rb-text', (value) -> $(this).text(value))
        ltAttr('rb-enabled', (value) -> $(this).prop('disabled', false))
        ltAttr('rb-disabled', (value) -> $(this).prop('disabled', true))
        ltAttr('rb-show', (value) -> $(this).show())
        ltAttr('rb-hide', (value) -> $(this).hide())
      )

    root = exports ? this
    unless root.reab
      root.reab = reab