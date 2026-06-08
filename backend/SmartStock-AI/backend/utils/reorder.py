def calculate_inventory_metrics(
    predicted_sales,
    lead_time=5
):

    avg_daily_demand = predicted_sales / 30

    safety_stock = avg_daily_demand * 5

    reorder_point = (
        avg_daily_demand * lead_time
    ) + safety_stock

    recommended_order = (
        predicted_sales
        + safety_stock
    )

    return {

        "safety_stock":
            round(safety_stock),

        "reorder_point":
            round(reorder_point),

        "recommended_order":
            round(recommended_order)
    }