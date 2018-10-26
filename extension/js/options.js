$(  function($scope){
    $('#lang-btn').click(function(){
        var x = $('#lang-btn').val();
        $('#lang-btn').val('');
        if (x)
            $scope.lang = x;
    });
});