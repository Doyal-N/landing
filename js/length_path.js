// Прослушивает ввел ли пользователь данные
(function (Function_prototype) {
    Function_prototype.debounce = function (delay, ctx) {
        var fn = this,
            timer;
        return function () {
            var args = arguments,
                that = this;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(ctx || that, args);
            }, delay);
        };
    };

})(Function.prototype);

window.addEventListener('DOMContentLoaded', function () {
    var boxfrom = document.getElementById('boxfrom');
    var boxin = document.getElementById('boxin');

    function test() {
        if (boxfrom.value != "" && boxin.value != "") {
            LengthPathRaschot_for_mail();
            //alert(boxfrom.value+'   '+boxin.value);
        }
    }
    boxfrom.addEventListener('input', test.debounce(1000));
    boxin.addEventListener('input', test.debounce(1000));
});
// Расчет расстояние
function LengthPathRaschot_for_mail() {
    // alert();
    var Fromtovn = document.getElementById('boxfrom').value;
    var Totovn = document.getElementById('boxin').value;
    ymaps.ready(function () {
        // Создание маршрута.
        var multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [Fromtovn, Totovn]
        }, );
        // Подписка на событие обновления данных маршрута.
        multiRoute.model.events.add('requestsuccess', function () {
            // Получение ссылки на активный маршрут.
            // В примере используется автомобильный маршрут,
            // поэтому метод getActiveRoute() вернет объект multiRouter.driving.Route.
            var activeRoute = multiRoute.getActiveRoute();
            // Вывод информации о маршруте.
            var LenPuth = parseInt(activeRoute.properties.get("distance").text.replace(/\D+/g, ""));
            document.getElementById('LengthPathForm').value = LenPuth;
            // alert('Sos'+document.getElementById("LengthPathForm").value);
        });
    });
}
