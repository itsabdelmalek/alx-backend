#!/usr/bin/env python3
"""
LIFOCache module
"""

BaseCaching = __import__("base_caching").BaseCaching


class LIFOCache(BaseCaching):
    """
    LIFOCache class inherits from BaseCaching and implements a caching system
    using the Last-In-First-Out (LIFO) algorithm.
    """
    def __init__(self):
        """
        Initialize the LIFOCache.
        """
        super().__init__()
        self.last_key = ""

    def put(self, key, item):
        """
        Add an item to the cache.

        If key or item is None, this method does nothing.
        If the number of items in self.cache_data > than BaseCaching.MAX_ITEMS
            Discard the last item put in the cache (LIFO algorithm).
            Print DISCARD: with the key discarded and a new line.
        """
        if key and item:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                print("DISCARD: {}".format(self.last_key))
                self.cache_data.pop(self.last_key)
            self.last_key = key

    def get(self, key):
        """
        Get an item from the cache by key.

        If key is None or if the key doesn’t exist in self.cache_data,
        return None
        """
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data.get(key)
