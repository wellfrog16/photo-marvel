// 剧本

define([
    'jquery',
    'orienter',
    'text!../components/usr/index.html!strip',
    'helper/rivers',
    'utils/sword'],
($, Orienter, htmlBlock) => {
    const world = myWorld;
    const river = {};

    // 挂载
    river.mount = function() {
        if (!this.$root) {
            world.root.append(htmlBlock);
            this.$root = world.root.find('.usr-index');

            this.bind();
        }
    };

    river.bind = function() {
        const o = new Orienter();

        o.onOrient = function(e) {
            // 防止极限转向
            if (e.b >= 90 || e.b <= -10) { return; }
            if (e.g >= 50 || e.g <= -50) { return; }

            //
            const originBeta = 35;
            let beta = e.b * -1 + originBeta;

            const maxDeg = 20;

            // 最大变化角度为 正负40度
            if (beta >= maxDeg) { beta = maxDeg; }
            if (beta <= -maxDeg) { beta = -maxDeg; }

            // const originGamma = 45;
            // console.log(e);
            let gamma = e.g;

            // 最大变化角度为 正负40度
            if (gamma >= maxDeg) { gamma = maxDeg; }
            if (gamma <= -maxDeg) { gamma = -maxDeg; }

            // console.log(e);
            $('.box').css('transform', `rotateX(${beta}deg) rotateY(${gamma}deg) rotateZ(0deg)`);

            let shadowY = 0;
            let shadowX = 0;

            if (beta > 0) {
                shadowY = parseInt(beta / 10) + 1;
            }

            if (beta < 0) {
                shadowY = parseInt(beta / 10) - 1;
            }

            if (gamma > 0) {
                shadowX = parseInt(gamma / 10) + 1;
            }

            if (gamma < 0) {
                shadowX = parseInt(gamma / 10) - 1;
            }

            $('.box').css('box-shadow', `${shadowX}px ${shadowY * -1}px 4px 1px #333`);
            // $('.box').text(e.b);
        };
        o.init();
    };

    river.show = () => {
        river.$root.show();
    };

    river.hide = () => {
        river.$root.hide();
    };

    // 销毁
    river.destroy = function() {
        this.$root.remove();
        this.$root = null;
    };

    world.rivers.$index = river;
    return river;
});
