!function(t,e,i,n){var a=i.template("district-rate-box-row-template"),o=t("#flat_rate_boxes"),s=o.find("tbody.flat_rate_boxes"),c={init:function(){o.on("click","a.add-box",this.onAddRate).on("click","a.remove",this.onRemoveRate);var e=s.data("boxes");t(e).each(function(t){var i=s.find(".flat_rate_box").length;s.append(a({box:e[t],index:i}))}),s.sortable({items:"tr",cursor:"move",axis:"y",handle:"td.sort_dwas_td",scrollSensitivity:40,helper:function(e,i){return i.children().each(function(){t(this).width(t(this).width())}),i.css("left","0"),i},start:function(t,e){e.item.css("background-color","#f6f6f6")},stop:function(t,e){e.item.removeAttr("style"),c.reindexRows()}})},onAddRate:function(e){e.preventDefault();var i=s,n=i.find(".flat_rate_box").length;i.append(a({box:{box_id:"",box_district:"",box_cost:"",box_title:""},index:n})),t(".chosen_select").select2()},onRemoveRate:function(i){if(i.preventDefault(),confirm(e.i18n.delete_rates)){var a=[];s.find("tr td.check-column input:checked").each(function(e,i){var n=t(i).closest("tr.flat_rate_box").find(".box_id").val();a.push(n),t(i).closest("tr.flat_rate_box").addClass("deleting")});var o={action:"woocommerce_district_rate_box_delete",box_id:a,security:e.delete_box_nonce};t.post(n,o,function(e){t("tr.deleting").fadeOut("300",function(){t(this).remove()})})}},reindexRows:function(){var e=0;s.find("tr").each(function(i,n){t("input.text, input.checkbox, select.select, .shipping_advance, .shipping_advance_w, .shipping_disable",n).each(function(i,n){var a=t(n);a.attr("name",a.attr("name").replace(/\[([^[]*)\]/,"["+e+"]"))}),t("input.input_district_condition",n).each(function(i,n){var a=t(n);a.attr("name",a.attr("name").replace(/\[([^[]*)\]/,"["+e+"]"))}),e++})}};c.init(),t(document).ready(function(){t("body").on("change",".shipping_advance",function(){var e=t(this).parents(".district_shipping_advance").find(".dwas_price_list");e.hasClass("dwas_hidden")&&t(this).is(":checked")?e.removeClass("dwas_hidden").addClass("dwas_show"):e.addClass("dwas_hidden").removeClass("dwas_show")}),t("body").on("change",".shipping_advance_w",function(){var e=t(this).parents(".district_shipping_advance_weight").find(".dwas_price_list");e.hasClass("dwas_hidden")&&t(this).is(":checked")?e.removeClass("dwas_hidden").addClass("dwas_show"):e.addClass("dwas_hidden").removeClass("dwas_show")}),t("body").on("click",".dwas_add_condition",function(){var e=t(this).parents(".district_shipping_advance"),i=e.find(".dwas_price_list_tr").eq(1).clone();i.find("input").val("").attr("value",""),t(".dwas_price_list_box",e).append(i);var n=-1;return t(".dwas_price_list_box .dwas_price_list_tr",e).each(function(e,i){t("input.input_district_condition",i).each(function(e,i){var a=t(i);a.attr("name",a.attr("name").replace(/\[dk_([^[]*)\]/,"[dk_"+n+"]"))}),n++}),!1}),t("body").on("click",".dwas_delete_condition",function(){var e=t(this).parents(".dwas_price_list_tr"),i=t(this).parents(".dwas_price_list_box");return t(".dwas_price_list_tr",i).length>2&&e.fadeOut(400,function(){t(this).remove();var e=-1;t(".dwas_price_list_tr",i).each(function(i,n){t("input.input_district_condition",n).each(function(i,n){var a=t(n);a.attr("name",a.attr("name").replace(/\[dk_([^[]*)\]/,"[dk_"+e+"]"))}),e++})}),!1}),t("#woocommerce_devvn_district_zone_shipping_all_price_condition").length>0&&(t("#woocommerce_devvn_district_zone_shipping_all_price_condition").closest("tr").css("display","none"),t("body").on("click",".dwas_save_condition, .all_condition_district > label",function(){var e=!1,i=t("#mainform").serialize();e||t.ajax({type:"post",dataType:"json",url:n,data:{action:"woocommerce_district_rate_array_to_serialize",data_form:i},context:this,beforeSend:function(){e=!0,t(".district_shipping_advance.all_condition_district").addClass("loading")},success:function(i){i.success&&t("#woocommerce_devvn_district_zone_shipping_all_price_condition").val(i.data),t(".district_shipping_advance.all_condition_district").removeClass("loading"),e=!1}})})),t("#woocommerce_devvn_district_zone_shipping_all_price_condition_w").length>0&&(t("#woocommerce_devvn_district_zone_shipping_all_price_condition_w").closest("tr").css("display","none"),t("body").on("click",".dwas_save_condition_w, .all_condition_district_w > label",function(){var e=!1,i=t("#mainform").serialize();e||t.ajax({type:"post",dataType:"json",url:n,data:{action:"woocommerce_district_rate_array_to_serialize_weight",data_form:i},context:this,beforeSend:function(){e=!0,t(".district_shipping_advance.all_condition_district_w").addClass("loading")},success:function(i){i.success&&t("#woocommerce_devvn_district_zone_shipping_all_price_condition_w").val(i.data),t(".district_shipping_advance.all_condition_district_w").removeClass("loading"),e=!1}})})),t("body").on("change",".box_district_select",function(){let e=t(this).val(),i=t(this).closest(".vn_checkout_box"),a=t(this).closest("tr"),o=t(".box_ward_select",a).val();return t.ajax({type:"post",dataType:"json",url:n,data:{action:"load_multi_ward",qh:e},context:this,beforeSend:function(){t(".box_ward_select",a).html("").select2();var e=new Option("Đang tải...","");t(".box_ward_select",a).append(e),i.addClass("loading")},success:function(e){if(e.success){let i=e.data;t(".box_ward_select",a).html("").select2(),t.each(i,function(e,i){let n=i.name,s=i.ward,c=t("<optgroup>");c.attr("label",n),t.each(s,function(e,i){let n=t("<option></option>");n.val(i.xaid),n.text(i.name),c.append(n)}),t(".box_ward_select",a).append(c),t(".box_ward_select",a).val(o).trigger("change")})}else alert(e.data);i.removeClass("loading")},error:function(t,e,n){i.removeClass("loading")}}),!1})})}(jQuery,woocommerce_district_shipping_rate_rows,wp,ajaxurl);